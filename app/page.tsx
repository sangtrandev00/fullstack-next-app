
import Feed from '@components/Feed';

const Home = () => {

  return (
    <>
      <section className="w-full flex-center flex-col ">
      <h2 className="head_text text-center">Home page</h2>
      <br className="max-md:hidden" />
      <span className="orange_gradient" >AI-Powered Prompts</span>
      <p className="desc text-center">
        Promptopia is an open source project AI Promting tool for modern world to discover
      </p>
    
      <Feed />
    </section>
    </>
  )
}

export default Home