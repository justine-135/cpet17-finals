import Head from "next/head";
import styles from "../../styles/login.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const login = () => {
  const router = useRouter();
  const { status, data } = useSession();

  if (status === "authenticated") {
    router.replace("/motion");
  } else {
    return (
      <>
        <Head>
          <title>MotionCPT</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <main className={styles.login_div}>
          <div className={styles.login_flex}>
            <img
              className={styles.svg}
              src="/camera.svg"
              alt="An SVG of an eye"
            />
            <p className={styles.p}>Welcome to MotionCPT.</p>
            <p className={styles.p}>
              Login or sign up your account to continue.
            </p>
            <div className={styles.buttons_div}>
              <button className={styles.login_btn} onClick={() => signIn()}>
                Sign in
              </button>
              <button
                className={styles.signup_btn}
                onClick={() => router.push("/auth/signup")}
              >
                Sign up
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }
  return <div>Loading</div>;
};

export default login;
