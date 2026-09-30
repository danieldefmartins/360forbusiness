import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import LegalPage from "../LegalPage";

export const metadata: Metadata = {
  title: "Tiny Giant Run – Privacy Policy",
  description: "How the Tiny Giant Run mobile game handles your information.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const EMAIL = "info@360forbusiness.com";

export default async function TinyGiantRunPrivacy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <LegalPage eyebrow="Tiny Giant Run" title="Privacy Policy" updated="September 30, 2026" locale={locale}>
      <p>
        This policy explains what information the Tiny Giant Run game (&quot;the game&quot;) handles. The game is
        published by 360 For Business LLC (&quot;we&quot;, &quot;us&quot;). We built the game to collect as little
        as possible: we do not run our own servers for the game, we do not ask you to create an account, and we do
        not sell your information.
      </p>

      <h2>Information stored on your device</h2>
      <p>
        Your progress (coins, Lives, Shield Boards, unlocked characters, best score, settings, Kids Mode stars and
        stickers, and a record of completed purchases) is saved only on your device. We do not receive it. Deleting
        the game deletes this data.
      </p>

      <h2>Game Center</h2>
      <p>
        If you are signed in to Apple Game Center, the game submits your final run scores to the World High Scores
        leaderboard and shows Apple&apos;s leaderboard screens. Apple handles your Game Center identity and scores
        under{" "}
        <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noreferrer">Apple&apos;s Privacy Policy</a>.
        We do not receive your Apple ID or contact details.
      </p>

      <h2>In-app purchases</h2>
      <p>
        Optional purchases (coins, Lives and Shield Boards) are processed by Apple through the App Store. We never
        see your payment details. The game only receives a confirmation from Apple so it can add the items you
        bought.
      </p>

      <h2>Advertising</h2>
      <p>
        The game shows ads only when you choose to watch one: to continue a run after a crash, or to earn a free
        Life. There are no automatic or forced ads. Ads are provided by Google AdMob. For every player, ad requests
        are <strong>non-personalized</strong> and limited to content rated <strong>G</strong> (general audiences).
        The game does not ask for permission to track you across other apps and websites, and it does not use your
        advertising identifier for tracking.
      </p>
      <p>
        To deliver and measure an ad, prevent fraud and limit how often ads repeat, Google may process information
        such as your device and app information, your IP address (which can indicate your approximate location),
        how you interact with the ad, and diagnostic data. Google handles this under{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google&apos;s Privacy Policy</a>{" "}
        and its{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">
          policy on how Google uses information from apps that use its services
        </a>
        . Where the law requires consent for ads (for example in the European Economic Area or the United Kingdom),
        you will be asked before ads are shown.
      </p>

      <h2>Kids Mode and children</h2>
      <p>
        Tiny Giant Run is made for a general audience, including families. Kids Mode (&quot;Tiny Adventures&quot;)
        never shows ads, never offers purchases and never connects to Game Center. We do not knowingly collect
        personal information from children. Purchases are protected by Apple&apos;s own authentication (Face ID,
        Touch ID or password) and by Ask to Buy for family accounts. If you believe a child has sent us personal
        information, contact us and we will delete it.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>You can play without watching any ads and without buying anything.</li>
        <li>You can sign out of Game Center in your device&apos;s Settings at any time.</li>
        <li>You can delete all game data by deleting the app.</li>
        <li>
          You can contact us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with any privacy question or request.
        </li>
      </ul>

      <h2>Changes to this policy</h2>
      <p>
        If we change how the game handles information, we will update this page and the date at the top.
      </p>

      <h2>Contact</h2>
      <p>
        360 For Business LLC
        <br />
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </LegalPage>
  );
}
