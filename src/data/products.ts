// ============================================================================
//  AFFILIATE PRODUCTS — central data source
// ----------------------------------------------------------------------------
//  This is the ONLY file you edit to manage affiliate products and links.
//  Blog posts reference products by `id` in their frontmatter (see any .md
//  file's `products:` / `comparison:` fields). The BlogPost layout looks them
//  up here and renders the product boxes + comparison tables automatically.
//
//  HOW TO GO LIVE:
//  1. Get approved by an affiliate network / brand program.
//  2. Replace each product's `url` below with your real tracked link
//     (or set AFFILIATE.tag and use buildUrl() for programs that append a tag).
//  3. That's it — every post updates automatically.
//
//  The links below are PLACEHOLDERS. Nothing here earns until you swap them.
// ============================================================================

/** Global affiliate config. Set these once your program is approved. */
export const AFFILIATE = {
  /** e.g. your Amazon Associates tag, or a network sub-id. Empty = not live. */
  tag: '',
  /** Shown in the disclosure banner + footer. */
  network: 'flere affiliate-partnere',
} as const;

/**
 * Append the affiliate tag to a URL for programs that use a query param
 * (e.g. Amazon `?tag=`). For networks that give you a full tracked link,
 * just paste that link into `url` and ignore this helper.
 */
export function buildUrl(url: string, param = 'tag'): string {
  if (!AFFILIATE.tag) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}${param}=${AFFILIATE.tag}`;
}

export interface Product {
  id: string;
  name: string;
  brand?: string;
  /** One-line pitch shown in the product box. */
  description: string;
  /** Free text so you can write "fra 249 kr." etc. */
  price?: string;
  /** 0–5, one decimal. Renders as stars. Omit to hide. */
  rating?: number;
  /** Small coloured label, e.g. "Bedste valg", "Bedste budget". */
  badge?: string;
  image?: string;
  pros?: string[];
  cons?: string[];
  /** Where the buyer lands. PLACEHOLDER until you paste your tracked link. */
  url: string;
  /** Shown under the CTA, e.g. "hos Proteinfabrikken". */
  merchant?: string;
  /** CTA button text. Defaults to "Se pris". */
  cta?: string;
}

// ---------------------------------------------------------------------------
//  Products. Grouped by topic for readability — order here doesn't matter,
//  posts pick products by id.
// ---------------------------------------------------------------------------
export const products: Product[] = [
  // --- CrossFit grips ---
  {
    id: 'victory-grips-3-finger',
    name: 'Victory Grips 3 Finger',
    brand: 'Victory Grips',
    description:
      'Markedets mest kendte grips. Håndlavet læder fra USA — holdbart greb til pull-ups, toes-to-bar og muscle-ups.',
    price: 'fra ca. 349 kr.',
    rating: 4.8,
    badge: 'Bedste valg',
    pros: ['Ekstremt holdbart læder', 'Godt greb på baren', 'Stor fanskare i DK'],
    cons: ['Kræver tilkøring', 'Dyrere end budget-modeller'],
    url: 'https://example.com/victory-grips', // TODO: your tracked link
    merchant: 'hos din foretrukne forhandler',
    cta: 'Se pris',
  },
  {
    id: 'jaw-pullup-grips',
    name: 'JAW Pull-up Grips',
    brand: 'JAW',
    description:
      'Australsk brand i læder og ruskind. Kan næsten det samme som de dyre — det oplagte budgetvalg til nybegynderen.',
    price: 'fra ca. 219 kr.',
    rating: 4.4,
    badge: 'Bedste budget',
    pros: ['Billigere indgang', 'God kvalitet for prisen'],
    cons: ['Ikke helt så slidstærk som Victory'],
    url: 'https://example.com/jaw-grips', // TODO: your tracked link
    merchant: 'hos din foretrukne forhandler',
  },
  {
    id: 'bear-komplex-grips',
    name: 'Bear KompleX 3-Hole Grips',
    brand: 'Bear KompleX',
    description:
      'Populært all-round valg med god balance mellem pris og holdbarhed. Fås i både læder og carbon.',
    price: 'fra ca. 299 kr.',
    rating: 4.6,
    pros: ['God midterløsning', 'Flere materialer at vælge mellem'],
    url: 'https://example.com/bear-komplex-grips', // TODO: your tracked link
    merchant: 'hos din foretrukne forhandler',
  },

  // --- Kalk / chalk ---
  {
    id: 'liquid-chalk',
    name: 'Flydende kalk (Liquid Chalk)',
    description:
      'Fitnesscenter-venlig kalk der ikke støver. Påføres som creme og tørrer til et tyndt, tørt lag. Ideel indendørs.',
    price: 'fra ca. 79 kr.',
    rating: 4.5,
    badge: 'Center-venlig',
    pros: ['Støver ikke', 'Tilladt de fleste steder', 'Holder længe'],
    cons: ['Skal tørre i få sekunder'],
    url: 'https://example.com/liquid-chalk', // TODO: your tracked link
    merchant: 'hos din foretrukne forhandler',
  },
  {
    id: 'loose-chalk',
    name: 'Løst magnesiumkalk',
    description:
      'Den klassiske og mest effektive form. Billigst pr. gram — bedst til dødløft og olympisk vægtløftning derhjemme.',
    price: 'fra ca. 49 kr.',
    rating: 4.3,
    pros: ['Billigst', 'Mest effektivt greb'],
    cons: ['Støver', 'Ofte forbudt i centre'],
    url: 'https://example.com/loose-chalk', // TODO: your tracked link
    merchant: 'hos din foretrukne forhandler',
  },

  // --- Proteinpulver ---
  {
    id: 'whey-protein',
    name: 'Whey Protein (valleprotein)',
    description:
      'Hurtigt optageligt valleprotein med alle essentielle aminosyrer. Det oplagte valg efter træning.',
    price: 'fra ca. 199 kr.',
    rating: 4.7,
    badge: 'Mest populær',
    pros: ['Hurtig optagelse', 'Højt proteinindhold', 'God pris pr. portion'],
    cons: ['Indeholder laktose'],
    url: 'https://example.com/whey-protein', // TODO: your tracked link
    merchant: 'hos din foretrukne forhandler',
  },
  {
    id: 'casein-protein',
    name: 'Kasein Protein',
    description:
      'Langsomt optageligt protein der frigiver aminosyrer over 5–7 timer. Perfekt inden sengetid.',
    price: 'fra ca. 229 kr.',
    rating: 4.4,
    pros: ['Lang metning', 'Ideel før sengetid'],
    cons: ['Tykkere konsistens'],
    url: 'https://example.com/casein-protein', // TODO: your tracked link
    merchant: 'hos din foretrukne forhandler',
  },
  {
    id: 'vegan-protein',
    name: 'Vegansk Protein',
    description:
      'Blanding af ært- og risprotein der matcher animalsk kvalitet. Laktosefri og plantebaseret.',
    price: 'fra ca. 219 kr.',
    rating: 4.3,
    badge: 'Plantebaseret',
    pros: ['Laktosefri', 'Velegnet til veganere'],
    cons: ['Lidt grovere konsistens'],
    url: 'https://example.com/vegan-protein', // TODO: your tracked link
    merchant: 'hos din foretrukne forhandler',
  },
];

// ---------------------------------------------------------------------------
//  Lookup helpers used by the layout. You normally don't touch these.
// ---------------------------------------------------------------------------
const byId = new Map(products.map((p) => [p.id, p]));

/** Resolve an array of ids to products, skipping any unknown ids. */
export function getProducts(ids: string[] = []): Product[] {
  return ids.map((id) => byId.get(id)).filter((p): p is Product => Boolean(p));
}

export function getProduct(id: string): Product | undefined {
  return byId.get(id);
}
