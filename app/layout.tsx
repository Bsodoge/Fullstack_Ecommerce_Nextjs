import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ShippingHeader from './components/ShippingHeader'
import Header from './components/Header'
import Footer from './components/Footer'
import { ShoppingCartProvider } from './context/shoppingCartContext'
import { UserContextProvider } from './context/userContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShippingHeader />
        <UserContextProvider>
          <ShoppingCartProvider>
            <Header />
            {children}
          </ShoppingCartProvider>
        </UserContextProvider>
        <Footer />
      </body>
    </html>
  )
}
