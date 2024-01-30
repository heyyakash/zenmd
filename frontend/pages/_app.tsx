import { ThemeProvider } from '@/components/Theme-provider'
import Layout from '@/components/layout/Layout'
import { Toaster } from '@/components/ui/sonner'
import '@/styles/globals.css'
import { NextComponentType, NextPageContext } from 'next'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

type ComponentType = {
  Component: NextComponentType<NextPageContext, any, any> & { getLayout?: JSX.Element }
  pageProps: any
}

export default function App({ Component, pageProps }: ComponentType) {
  const layout = Component.getLayout
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {layout?(
          <Component {...pageProps} />
          ):(
            <Layout>
          
            <Component {...pageProps} />
            </Layout>
          )}
        <Toaster expand = {true} richColors/>
      </ThemeProvider></QueryClientProvider>
  )
}
