import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
export const metadata = {
    title: 'Fullstack Next App',
    description: 'Discover & share ai prompts'
}

const RootLayout = ({children}: {children: React.ReactNode}) => {

  return (
    <html lang="en">

        <body>
            <div className="main">
                <div className="gradient">

                </div>

                <div className="app">
                    <Nav/>
                    {children}
                </div>
            </div>
        </body>

    </html>
  )
}

export default RootLayout
