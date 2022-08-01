const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.json({ data: createdUser });
  } catch (e) {
    return res.status(409).json({ error: "User already exists" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid name or password" });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordsMatch) {
    return res.status(401).json({ error: "Invalid name or password." });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  return res.json({ data: token });
};

module.exports = {
  register,
  login,
};
