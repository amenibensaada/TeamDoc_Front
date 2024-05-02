import { useNavigate } from "react-router-dom";
import landingPage from "../../assets/img/landigPage.png";
import Footer from "../footer/footer";
// import logo from "../../assets/img/logo.png";

function LandingPage() {
  const navigate = useNavigate();
  const handleLoginClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate("/login");
  };
  const handleSignupClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate("/signup");
  };

  return (
    <>
      <div>
        <div className="flex flex-col min-h-[100dvh] ml-20">
          <header className="px-4 lg:px-6 h-14 flex items-center">
            {/* <a className="flex items-center justify-center" href="#">
              <img src={logo} alt="Logo" />
            </a> */}
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <a
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#">
                Home
              </a>
              <a
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#">
                Services
              </a>
              <a
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#">
                Contact
              </a>
              <a
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#">
                SignUp
              </a>
            </nav>
          </header>
          <main className="flex-1">
            <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-24">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        TeamDoc: Where collaborative document management meets
                        seamless organization.
                      </h1>
                      <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                        Join us in revolutionizing the way teams collaborate,
                        create, and organize documents.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <a
                        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        href="#"
                        onClick={handleSignupClick}>
                        Get Started
                      </a>
                      <a
                        className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                        href="#"
                        onClick={handleLoginClick}>
                        LogIn
                      </a>
                    </div>
                  </div>

                  <img
                    src={landingPage}
                    width="550"
                    height="550"
                    alt="Hero"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
