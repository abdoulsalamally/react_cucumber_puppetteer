import {
  Given,
  When,
  Then,
  setDefaultTimeout,
  After,
} from "@cucumber/cucumber";
import puppeteer from "puppeteer";
import { expect } from "chai";

setDefaultTimeout(50000);

let browser;
let page;

// Étape pour naviguer vers la page de connexion
Given("l'utilisateur est sur la page de connexion", async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 618 });
  await page.goto("http://localhost:5173/");
  await page.waitForSelector('input[name="email"]', { visible: true });
});

// Étape pour entrer des identifiants valides
When("l'utilisateur entre des identifiants valides", async () => {
  await page.waitForSelector('input[name="email"]', { visible: true });
  await page.type('input[name="email"]', "abdoul@cucumber.com");
  await page.type('input[name="password"]', "12345");
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
});

// Étape pour vérifier la connexion réussie
Then("l'utilisateur devrait voir le tableau de bord", async () => {
  const url = page.url();
  expect(url).to.include("/dashboard"); // Mettez l'URL exacte de la page de tableau de bord, si possible
});

// Étape pour entrer des identifiants invalides
When("l'utilisateur entre des identifiants invalides", async () => {
  await page.waitForSelector('input[name="email"]', { visible: true });
  await page.type('input[name="email"]', "utilisateurinvalide@gmail.com");
  await page.type('input[name="password"]', "mauvaismotdepasse");
  await page.click('button[type="submit"]');
});

// Étape pour vérifier le message d'erreur et rester sur la page de connexion
Then(
  "l'utilisateur devrait voir un message d'erreur indiquant une connexion invalide",
  async () => {
    await page.waitForSelector(".p-toast-message-error", { visible: true });
    const errorMessage = await page.$eval(
      ".p-toast-message-error",
      (el) => el.textContent
    );
    expect(errorMessage).to.include("Identifiants incorrects");
  }
);

Then("l'utilisateur devrait rester sur la page de connexion", async () => {
  const url = page.url();
  expect(url).to.include("/");
});

// Hook After pour garder le navigateur ouvert pendant 10 secondes avant de le fermer
After(async () => {
  if (page) {
    // Utilisation de setTimeout pour attendre 10 secondes
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  if (browser) {
    await browser.close();
  }
});
