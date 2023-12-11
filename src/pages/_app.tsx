// src/pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import { AddressProvider } from '../components/AddressContext';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <AddressProvider>
     <Component {...pageProps} />
     </AddressProvider>
    </ThemeProvider>
    
  )
}

