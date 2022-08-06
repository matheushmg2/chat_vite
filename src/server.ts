import { app, serverHTTP } from "./app";

app.get("/github", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (req, res) => {
  const { code } = req.query;

  return res.json(code);
});

serverHTTP.listen(4000, () => {
  console.log("Rodando na porta 4000");
});
