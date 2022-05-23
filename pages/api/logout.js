import { magicAdmin } from "../../lib/magic";
import { removeCookie } from "../../lib/cookies";

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : "";
      console.log({ didToken });
      const jwtToken = req.cookies.token;

      removeCookie(jwtToken, res);
      await magicAdmin.users.logoutByToken(didToken);
      res.status(200).send({ done: true });
    } catch (error) {
      console.error("Something went wrong", error);
      res.status(500).send({ done: false });
    }
  } else {
    console.error("Something went wrong");
    res.status(500).send({ done: false });
  }
}
