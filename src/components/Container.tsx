import { motion } from "framer-motion"
import React, { Dispatch, SetStateAction } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toggleTheme } from "../helpers/toggleTheme"
import { isTokenValid } from "../isTokenExpired"
import { Avatar } from "./Avatar"
import { MainButton } from "./Buttons/MainButton"
import { MyPopover } from "./MenuBar/MobilePopover"
import { SideNav } from "./SideNavigation/SideNavigation"

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 1.4
  },
  visible: {
    opacity: 1,
    // y: "0",
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 0.8,
      ease: "easeInOut",
      type: "spring"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      transition: { ease: "easeInOut", duration: 0.2 }
    }
  }
}
export const Container: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const {
    currentUser: { user }
  } = useAuth()
  const history = useHistory()
  return (
    <div className="min-h-screen">
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <SideNav />
          <MyPopover />
          <motion.main
            className="lg:col-span-7 xl:col-span-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.main>

          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <div className="sticky top-4">
              <div className="bg-white w-full flex flex-col items-center py-4 dark:bg-dracula-700 dark:text-white">
                <Avatar
                  src={
                    user?.imageUrl
                      ? user.imageUrl
                      : "https://miro.medium.com/max/1200/1*cLQUX8jM2bMdwMcV2yXWYA.jpeg"
                  }
                  rounded
                  size="lg"
                />
                <h2 className="mt-4 text-xl  font-light capitalize text-center">
                  {user?.username}
                </h2>

                <h4 className="my-1 text-gray-600 text-sm dark:text-gray-200">
                  {user?.email}
                </h4>
                <MainButton
                  type="button"
                  onClick={() => {
                    history.push(`/user/${user?.id}`)
                  }}
                >
                  View Profile
                </MainButton>
                <div className="mb-2 mt-1">
                  <MainButton onClick={toggleTheme} type="button">
                    Switch Mode
                  </MainButton>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
