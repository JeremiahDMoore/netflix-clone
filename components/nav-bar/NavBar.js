import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css";

const NavBar = ({ username }) => {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const onClickHomeHandler = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const onClickMyListHandler = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const showDropdownHandler = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <a>
            <div className={styles.logoWrapper}>
              <Image
                src={"/static/netflix.svg"}
                alt="Netflix Logo"
                width="111px"
                height="30px"
              />
            </div>
          </a>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={onClickHomeHandler}>
            Home
          </li>
          <li className={styles.navItem2} onClick={onClickMyListHandler}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={showDropdownHandler}
            >
              <p className={styles.userName}>{username}</p>
              <Image
                src={"/static/expand_more.svg"}
                alt="Expand dropdown"
                width="24px"
                height="24px"
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login">
                    <a className={styles.linkName} onClick="">
                      Sign Out
                    </a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
