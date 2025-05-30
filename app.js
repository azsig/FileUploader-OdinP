const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const authRoutes = require('./src/routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const folderRoutes = require('./routes/folderRoutes');
require('./src/config/passportConfig')(passport);

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      prisma,
      { checkPeriod: 2 * 60 * 1000, dbRecordIdIsSessionId: true }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/files', fileRoutes);
app.use('/folders', folderRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});