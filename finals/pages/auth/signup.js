import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "../../styles/signin.module.css";
import Link from "next/link";

const signup = () => {
  const router = useRouter();
  const { status, data } = useSession();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [alert, setAlert] = useState("");

  const handleSubmit = async (e) => {
    // validate user
    e.preventDefault();

    let result = false;

    // password must be 8 characters minimum
    if (userInfo.password.length < 7) {
      result = true;
      setAlert("Minimum character for password is 8!");
    }

    // password and confirm password must be same
    if (userInfo.password !== userInfo.cpassword) {
      setAlert("Password not match!");
      result = true;
    }

    // username must be 6 characters minimum
    if (userInfo.username.length < 5) {
      setAlert("Minimum character for username is 6!");
      result = true;
    }

    if (result != true) {
      try {
        const res = await fetch("http://localhost:3002/api/users/check", {
          method: "POST",
          body: JSON.stringify({ userInfo }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        // if user not registered yet, insert
        if (user.length == 0) {
          const res2 = await fetch("http://localhost:3002/api/users/insert", {
            method: "POST",
            body: JSON.stringify({ userInfo }),
            headers: { "Content-Type": "application/json" },
          });

          const user2 = await res2.json();

          if (user2) {
            window.alert("User is created.");
            router.push("/auth/signin");
          }
        } else {
          setAlert("Username or email already created!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not pushed");
    }
  };

  if (status === "authenticated") {
    router.replace("/");
  } else {
    return (
      <>
        <Head>
          <title>MotionCPT | Create account</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main className={styles.signin_div}>
          <form
            className={styles.signin_form}
            action=""
            onSubmit={handleSubmit}
          >
            <img src="/camera.svg" alt="" height={42} width={42} />

            <h1 className={styles.h1}>Signup here</h1>
            <input
              className={styles.input_text}
              type="email"
              name="email"
              id=""
              placeholder="Email"
              onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value });
              }}
            />
            <input
              className={styles.input_text}
              type="text"
              name="username"
              placeholder="Username"
              id=""
              onChange={(e) => {
                setUserInfo({ ...userInfo, username: e.target.value });
              }}
            />
            <input
              className={styles.input_text}
              type="password"
              name="password"
              id=""
              placeholder="Password"
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
            />
            <input
              className={styles.input_text}
              type="password"
              name="password"
              id=""
              placeholder="Confirm password"
              onChange={(e) => {
                setUserInfo({ ...userInfo, cpassword: e.target.value });
              }}
            />
            <input
              className={styles.signup_btn}
              type="submit"
              value="Create account"
              name="login"
              id=""
            />
            <p className={styles.p_notfound}>{alert}</p>

            <p className={styles.p}>
              Already have an account?{" "}
              <Link className={styles.signup_link} href="/auth/signin">
                Login here
              </Link>
            </p>
          </form>
        </main>
      </>
    );
  }

  return <div>Loading</div>;
};

export default signup;
