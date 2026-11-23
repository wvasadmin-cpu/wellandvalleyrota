import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stewarding Guide — Welland Valley Art Society",
};

const SECTIONS = [
  { group: "Daily duties", items: [
    { id: "arrival", label: "On arrival" },
    { id: "during", label: "During the day" },
    { id: "end", label: "End of the day" },
  ] },
  { group: "Artwork sales", items: [
    { id: "payment", label: "Taking payment" },
    { id: "invoice-book", label: "Sales Invoice Book" },
    { id: "after-sale", label: "After the sale" },
    { id: "collection", label: "Collection of sold work" },
  ] },
];

function Section({ id, title, who, children }: {
  id: string;
  title: string;
  who?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4 border-b border-base-300 pb-1 mb-3">
        <h3 className="font-display text-lg text-primary">
          {title}
          {who && (
            <span className="text-sm text-accent font-normal" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
              {" "}· {who}
            </span>
          )}
        </h3>
        <a href="#top" className="text-xs text-accent hover:text-primary whitespace-nowrap print:hidden">↑ Top</a>
      </div>
      {children}
    </section>
  );
}

function Bullets({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc marker:text-secondary pl-5 space-y-2">{children}</ul>;
}

function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal marker:text-primary marker:font-bold pl-6 space-y-2">{children}</ol>;
}

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.18em] uppercase text-accent pt-2">{children}</p>
  );
}

export default function StewardingGuidePage() {
  return (
    <div id="top" className="md:grid md:grid-cols-[13rem_1fr] md:gap-10 py-6 text-base-content">

      <nav aria-label="Guide sections" className="print:hidden mb-6 md:mb-0">
        <div className="md:sticky md:top-6">
          {/* Phones: a wrapping row of buttons. Larger screens: a list down the left. */}
          <div className="flex flex-wrap gap-2 md:hidden">
            {SECTIONS.flatMap((g) => g.items).map((s) => (
              <a key={s.id} href={`#${s.id}`} className="btn btn-sm btn-outline btn-primary font-normal">
                {s.label}
              </a>
            ))}
          </div>
          <div className="hidden md:block space-y-4">
            {SECTIONS.map((g) => (
              <div key={g.group}>
                <p className="text-[11px] tracking-[0.18em] uppercase text-accent mb-1">{g.group}</p>
                <ul className="border-l-2 border-base-300">
                  {g.items.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block -ml-0.5 border-l-2 border-transparent pl-3 py-1 text-sm hover:border-secondary hover:text-primary"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-2xl space-y-8">
        <div>
          <h2 className="font-display text-2xl text-primary mb-2">Stewarding Guide</h2>
          <p>Daily duties and the Sales Invoice Book. Each day has three stages: the first stewards open up, all stewards look after the desk during the day, and the last stewards close down.</p>
        </div>

        <GroupHeading>Daily duties</GroupHeading>

        <Section id="arrival" title="On arrival" who="first stewards of the day">
          <Bullets>
            <li>Collect the cash box and card machine from the Arts Centre front office. Inside are the previous day&apos;s receipts (credit card receipts, cash and cheques) and the Daily Sales Receipts sheet. The Treasurer or another committee member collects these for banking.</li>
            <li>Secure the cash box to the stewards&apos; table with its chain.</li>
            <li>Take a new Daily Sales Receipts sheet from the pack and write the date in the top right-hand corner.</li>
            <li>Fix the wooden exhibition noticeboards to the wall hooks either side of the Arts Centre entrance.</li>
          </Bullets>
        </Section>

        <Section id="during" title="During the day" who="all stewards on duty">
          <Bullets>
            <li>At the start of your shift, read <a href="#payment" className="text-primary underline underline-offset-2 decoration-secondary">Artwork sales</a> (below) and the <em>Guide to Credit Card Sales</em>, so you can deal confidently and quickly with would-be purchasers.</li>
            <li>Wear your name badge. If your fellow steward does not turn up, try to contact them (numbers on the <Link href="/contacts" className="text-primary underline underline-offset-2 decoration-secondary">Contacts</Link> tab or the desk printout) to find out why.</li>
            <li>Display the Visitors&apos; Book, exhibition catalogues and <em>Do You Love Art</em> promotional leaflets on the stewards&apos; desk.</li>
            <li>Move round the gallery from time to time, particularly when it is crowded, to deter thieves.</li>
            <li>Talk to visitors and encourage them to vote for their favourite artwork. Keep the voting box prominent, with plenty of blank voting slips and pens beside it. Spare voting forms are in the folder.</li>
            <li>Mark off visitor numbers in the Visitors&apos; Book.</li>
            <li>Keep entries in the Stewards&apos; Comments Book legible, with full contact details for visitors who leave queries, so exhibitors or committee members can reply.</li>
            <li>If you meet a problem you cannot resolve, contact the Exhibition Secretary or one of the other committee contacts listed for the exhibition.</li>
          </Bullets>
        </Section>

        <Section id="end" title="End of the day" who="last stewards on duty">
          <Bullets>
            <li>Put all money collected during the day, together with the Daily Sales Receipts sheet, in the cash box.</li>
            <li>Leave the cash box and the card machine (turned off) with the Arts Centre front office for collection by the Treasurer.</li>
            <li>Bring the noticeboards back into the gallery and place them behind the stewards&apos; desk.</li>
            <li>Bolt the gallery door and tell Arts Centre staff you are leaving, so the alarms can be set.</li>
          </Bullets>
        </Section>

        <GroupHeading>Artwork sales</GroupHeading>
        <p className="-mt-6">Every sale is entered in the Sales Invoice Book and listed on the daily record sheet. The book makes a duplicate: the buyer takes the yellow copy and the other copies stay in the book.</p>

        <Section id="payment" title="Taking payment">
          <div className="bg-base-200 border-l-4 border-secondary px-5 py-4 mb-4">
            <strong className="text-primary">No deposit, no sale.</strong> A customer can pay in full or pay a 20% deposit, with the balance due on collection.
          </div>
          <Bullets>
            <li>When a customer pays the balance on collection, add it to their existing order in the Sales Invoice Book.</li>
            <li>Accepted payments are cash, credit card, BACS or cheque. Cheques must be made payable to <em>Welland Valley Art Society</em>.</li>
          </Bullets>
        </Section>

        <Section id="invoice-book" title="Filling in the Sales Invoice Book">
          <Steps>
            <li>Check the cardboard barrier sheet is in place between the <strong>yellow</strong> and <strong>white</strong> sheets <em>before</em> you start a new invoice.</li>
            <li>Write firmly and clearly <strong>with a biro</strong>, so the duplicate can be read easily.</li>
            <li>Use a separate sheet for each sale.</li>
            <li>Ask the buyer whether they would like to hear about future events and make sure they have read the notice about personal data.</li>
            <li>When the paperwork is complete, give the buyer the <strong>yellow copy</strong>. Leave the other copies in the book.</li>
          </Steps>
        </Section>

        <Section id="after-sale" title="After the sale">
          <Steps>
            <li>After every financial transaction, enter the details on the Daily Cash Sheet.</li>
            <li>Put a <strong>red dot</strong> on the work.</li>
            <li>Mark the work as sold on the browser list or the master catalogue.</li>
          </Steps>
        </Section>

        <Section id="collection" title="Collection of sold work">
          <p className="mb-3">Buyers collect sold artworks between <strong>1pm and 5pm on the last day</strong> of the exhibition and must bring the <strong>yellow copy</strong> of their invoice as proof of purchase.</p>
          <Bullets>
            <li>Tell the buyer where and when to collect their artwork.</li>
            <li>If they cannot collect at the end of the show, they should email the Exhibition Secretary in advance. The Secretary will contact the artist to arrange another collection.</li>
            <li><strong>Browsers</strong> (loose works on paper) may be taken straight away once paid in full.</li>
          </Bullets>
        </Section>
      </div>
    </div>
  );
}
