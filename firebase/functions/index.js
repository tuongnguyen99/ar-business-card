const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ar-card-cb010.firebaseio.com",
});

const express = require("express");
const cors = require("cors");

const app = express();
const db = admin.firestore();

// middleware
app.use(cors({ origin: true }));

//routes
app.post("/api/users", (req, res) => {
  const { username, password } = req.body;
  (async () => {
    try {
      const usersRef = db.collection("users");
      const query = usersRef.where("username", "==", username);
      await query.get().then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          return res.status(409).send({
            status: "409 - conflict",
            message: "username already registered",
          });
        } else {
          db.collection("users")
            .add({
              username,
              password: Buffer.from(password).toString("base64"),
              createdAt: new Date(),
            })
            .then((docRef) => {
              return res.send(docRef.id);
            });
        }
      });
    } catch (error) {
      return res.status(500).send();
    }
  })();
});

app.post("/api/users/login", (req, res) => {
  const { username, password } = req.body;
  (async () => {
    db.collection("users")
      .where("username", "==", username)
      .where("password", "==", Buffer.from(password).toString("base64"))
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0)
          return res
            .status(400)
            .send({ status: 400, message: "wrong username or password" });
        querySnapshot.forEach(function (doc) {
          return res.send({ id: doc.id });
        });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  })();
});

app.post("/api/profiles", (req, res) => {
  const {
    userId,
    videoUrl,
    name,
    email,
    phone,
    facebook,
    textColor,
  } = req.body;
  (async () => {
    try {
      await db
        .collection("profiles")
        .doc()
        .create({
          userId,
          targetImageUrl: "https://via.placeholder.com/250",
          avatarImageUrl: "https://via.placeholder.com/120",
          largeImageUrl: "https://via.placeholder.com/450",
          profileUrl: "https://google.com",
          videoUrl: videoUrl || "",
          name: name || "Your name",
          email: email || "Your email",
          phone: phone || "Your phone",
          facebook: facebook || "https://facebook.com",
          textColor: textColor || "#fff",
        });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  })();
});

// get profile by user id
app.get("/api/profiles/:userId", (req, res) => {
  (async () => {
    db.collection("profiles")
      .where("userId", "==", req.params.userId)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0)
          return res
            .status(400)
            .send({ status: 400, message: "profile does not exist" });
        querySnapshot.forEach(function (doc) {
          return res.send({ id: doc.id, ...doc.data() });
        });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  })();
});

app.get("/api/profiles", (req, res) => {
  (async () => {
    try {
      const query = db.collection("profiles");
      let response = [];
      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const item = {
            id: doc.id,
            doc: doc.data(),
          };
          response.push(item);
        }
        return response;
      });
      res.status(200).send(response);
    } catch (error) {
      console.log(err);
      res.status(500).send(error);
    }
  })();
});

app.put("/api/profiles/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("profiles").doc(req.params.id);
      await document.update({
        ...req.body,
      });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })();
});

app.delete("/api/profiles/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("profiles").doc(req.params.id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(err);
      res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);
