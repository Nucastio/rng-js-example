import Head from "next/head";


const Layout = ({ children }) => {

    return (
        <>
            <Head>
                <title>Dice Game</title>

            </Head>
            <main
                className={`relative min-h-screen w-full bg-[#121212] text-tertiary`}
            >
                <div className="flex h-screen w-full flex-col items-center justify-center">
                    {children}
                </div>
            </main>
        </>
    );
};

export default Layout;
