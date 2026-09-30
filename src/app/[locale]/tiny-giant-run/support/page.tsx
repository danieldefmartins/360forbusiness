import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import LegalPage from "../LegalPage";

export const metadata: Metadata = {
  title: "Tiny Giant Run – Support",
  description: "Help and contact for the Tiny Giant Run mobile game.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const EMAIL = "info@360forbusiness.com";

export default async function TinyGiantRunSupport({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <LegalPage eyebrow="Tiny Giant Run" title="Support" locale={locale}>
      <p>
        Need help with Tiny Giant Run? Email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and include your device
        model and what happened. We usually reply within two business days.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>How do I play?</h3>
      <p>
        Swipe left and right to change lanes, swipe up to jump (swipe up again in the air to boost), and swipe down
        to slide. Collect coins to fill the power meter, then double tap to grow giant. Tap <em>How to Play</em> on
        the main menu to replay the tutorial at any time.
      </p>

      <h3>What are the power forms?</h3>
      <p>
        The coins you collect in a run decide which form you get when you double tap: Giant, Flyer, Steel, Speedster
        or Golden. Every form is magnetic and smashes or flies past obstacles for a few seconds.
      </p>

      <h3>What are Lives?</h3>
      <p>
        When you crash on your last heart, you can continue the run by spending Lives or by watching an optional ad
        (once per run). You can get free Lives by watching ads in the shop (up to 3 per day), or buy Lives packs.
      </p>

      <h3>I bought something but didn&apos;t get it.</h3>
      <p>
        Make sure you are connected to the internet and reopen the game. Completed purchases are delivered
        automatically when the game starts. If it still hasn&apos;t arrived, email us with the date and item. For
        refunds, use{" "}
        <a href="https://reportaproblem.apple.com" target="_blank" rel="noreferrer">Apple&apos;s Report a Problem</a>{" "}
        page, because all payments are handled by Apple.
      </p>

      <h3>Will I lose my progress if I delete the game?</h3>
      <p>
        Yes. Your coins, characters and progress are saved on your device, so deleting the app deletes them.
        Game Center scores stay on the leaderboard.
      </p>

      <h3>How do I see the world rankings?</h3>
      <p>
        Sign in to Game Center in your device&apos;s Settings, then tap <em>World Ranks</em> on the main menu.
      </p>

      <h3>Is it safe for kids?</h3>
      <p>
        Yes. Kids Mode (&quot;Tiny Adventures&quot;) has ten easy levels with no ads, no purchases and no Game
        Center. In the main game, ads only play when a player chooses to watch one, and all ads are family-safe and
        non-personalized. See our <a href={`/${locale}/tiny-giant-run/privacy`}>Privacy Policy</a> for details.
      </p>

      <h2>Contact us</h2>
      <p>
        360 For Business LLC
        <br />
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </LegalPage>
  );
}
