import { ReactNode } from "react"
import { LayoutProvider } from "./_components/LayoutProvider"

interface IProfileLayoutProps {
  children: ReactNode
}

export default function ProfileLayout({ children }: IProfileLayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>
}
