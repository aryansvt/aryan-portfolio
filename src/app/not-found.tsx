import Link from "next/link";

import { ArrowLeft } from "@/components/icons";

// the layout's skip link and header pill land here too, so this page gives them their targets
export default function NotFound() {
  return (
    <main id="content" data-ground="paper" className="grid min-h-svh items-center py-32">
      <div id="top" className="wrap">
        <h1 className="t-display close-title">404</h1>
        <p className="t-body mt-6">There’s nothing at this address. The link might have a typo, or the page moved.</p>
        <Link href="/" className="btn btn-solid mt-8">
          <ArrowLeft className="nudge-back" />
          Back home
        </Link>
      </div>
    </main>
  );
}
