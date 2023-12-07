import { useRouter } from "next/router"
import { useCallback } from "react"
import { IconType } from "react-icons"
import { BsDot } from "react-icons/bs"

import useCurrentUser from "~/hooks/useCurrentUser"
import { useLoginModal } from "~/hooks/useLoginModal"

interface SidebarItemProps {
  label: string
  href?: string
  icon: IconType
  onClick?: () => void
  auth?: boolean
  alert?: boolean
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, onClick, auth, alert }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) router.push(href)

  }, [router, onClick, href, currentUser, loginModal, auth])

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
        {alert ? <BsDot size={17} className="text-sky-500 absolute -top-4 left-0" /> : null}
      </div>

      <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? <BsDot size={70} className="text-sky-500 absolute -top-4 left-0" /> : null}
      </div>
    </div>
  )
}