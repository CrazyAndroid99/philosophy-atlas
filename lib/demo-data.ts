import type { AtlasNode, Relationship, Reference } from './graph';
const node = (id: string, label: string, type: AtlasNode['type'], description: string, x: number, y: number, initial = true): AtlasNode => ({ id, label, type, description, x, y, initial });
export const nodes: AtlasNode[] = [
 node('spinoza','Baruch Spinoza','philosopher','1632–1677 · Dutch philosopher. His Ethics connects freedom with understanding necessity and the causes of our actions.',-260,-70),
 node('sartre','Jean-Paul Sartre','philosopher','1905–1980 · French philosopher. He emphasizes situated freedom, choice, and responsibility.',270,-50),
 node('freedom','Freedom','concept','What does it mean to act freely? This atlas juxtaposes accounts of rational self-understanding and existential choice.',0,0),
 node('ethics','Ethics','book','Spinoza’s geometrically organized account of God, nature, mind, affects, and human freedom. Published in 1677.',-360,85),
 node('being','Being and Nothingness','book','Sartre’s 1943 work of phenomenological ontology, including an extended treatment of freedom.',370,110),
 node('necessity','Necessity','concept','In Spinoza’s system, things follow from the necessity of divine nature.',-140,-200),
 node('responsibility','Responsibility','concept','The demand to own one’s choices and their significance for others.',190,210),
 node('rationalism','Rationalism','tradition','A broad grouping emphasizing reason in the acquisition and justification of knowledge.',-410,-230),
 node('existentialism','Existentialism','tradition','A diverse philosophical movement concerned with existence, choice, and human situation.',430,-220),
 node('beauvoir','Simone de Beauvoir','philosopher','1908–1986 · French philosopher exploring ambiguity, freedom, oppression, and relations with others.',470,280),
 node('ambiguity','The Ethics of Ambiguity','book','Beauvoir’s 1947 work develops an ethics attentive to freedom and the freedom of others.',360,410),
 node('descartes','René Descartes','philosopher','1596–1650 · Philosopher associated with rationalism and the distinction between mind and body.',-580,-90),
 node('mind','Mind and body','concept','Questions about the relation between thought and embodied existence.',-530,235),
 node('badfaith','Bad faith','concept','Sartre’s analysis of evading or concealing one’s freedom and situation.',160,-260),
 node('humanism','Existentialism Is a Humanism','book','Sartre’s published 1945 lecture defends existentialism and explains freedom and responsibility.',80,365),
 node('affects','Affects','concept','Spinoza analyzes affects and how understanding them can alter our relationship to them.',-220,300,false),
 node('conatus','Conatus','concept','Spinoza’s term for each thing’s striving to persevere in its being.',-350,420,false),
 node('situation','Situation','concept','The concrete conditions within which existential freedom is exercised.',620,40,false),
];
const ethics: Reference = { title: 'Spinoza, Ethics', locator: 'Part I, definition 7; Part I, proposition 29; Part V, proposition 6', url: 'https://www.gutenberg.org/ebooks/3800' };
const sartre: Reference = { title: 'Sartre, Being and Nothingness (1943)', locator: 'Part Four, chapter 1: Being and Doing: Freedom', url: 'https://plato.stanford.edu/entries/sartre/' };
const humanism: Reference = { title: 'Sartre, Existentialism Is a Humanism', locator: '1945 lecture, discussion of freedom and responsibility', url: 'https://www.marxists.org/reference/archive/sartre/works/exist/sartre.htm' };
const beauvoir: Reference = { title: 'Beauvoir, The Ethics of Ambiguity', locator: 'Part I: Ambiguity and Freedom; Part III: The Positive Aspect of Ambiguity', url: 'https://www.marxists.org/reference/subject/ethics/de-beauvoir/ambiguity/' };
const edge = (source: string, target: string, type: Relationship['type'], explanation: string, sources: Reference[] = [], evidence: Relationship['evidence'] = sources.length ? 'sourced' : 'illustrative'): Relationship => ({id:`${source}-${target}`,source,target,type,explanation,sources,evidence});
export const relationships: Relationship[] = [
 edge('spinoza','sartre','comparison','Editorial comparison, not a claim of historical influence: Spinoza connects freedom to understanding necessity; Sartre stresses inescapable choice within a situation. The cited works support the respective positions, not a documented connection between the authors.',[ethics,sartre],'inferred'),
 edge('spinoza','freedom','discusses','Spinoza defines a free thing through the necessity of its own nature and connects understanding necessity to greater power over affects.',[ethics]),
 edge('sartre','freedom','discusses','Sartre examines freedom as constitutive of human existence, exercised within a situation.',[sartre]),
 edge('spinoza','ethics','authorship','Spinoza is the author of Ethics.',[ethics]),
 edge('sartre','being','authorship','Sartre is the author of Being and Nothingness.',[sartre]),
 edge('spinoza','necessity','discusses','Ethics I, proposition 29 states that nothing in nature is contingent.',[ethics]),
 edge('sartre','responsibility','discusses','The lecture connects human choice with responsibility for oneself and for humanity.',[humanism]),
 edge('sartre','humanism','authorship','The published text derives from Sartre’s 1945 lecture.',[humanism]),
 edge('sartre','badfaith','discusses','Bad faith explores how people evade recognition of their freedom.',[{...sartre,locator:'Part One, chapter 2: Bad Faith'}]),
 edge('beauvoir','ambiguity','authorship','Beauvoir is the author of The Ethics of Ambiguity.',[beauvoir]),
 edge('beauvoir','freedom','discusses','Beauvoir develops the ethical interdependence of one’s freedom and the freedom of others.',[beauvoir]),
 edge('spinoza','rationalism','association','Demo grouping of Spinoza within rationalism. This broad classification is provided as an illustrative navigation aid.'),
 edge('descartes','rationalism','association','Demo grouping of Descartes within rationalism; no specific historical argument is asserted.'),
 edge('descartes','mind','association','Illustrative topic link for exploring mind–body questions. Add a verified reference before treating it as sourced.'),
 edge('spinoza','mind','association','Illustrative topic link; this demo does not equate Spinoza’s and Descartes’s positions.'),
 edge('sartre','existentialism','association','Illustrative navigation grouping under existentialism.'),
 edge('beauvoir','existentialism','association','Illustrative navigation grouping under existentialism.'),
 edge('spinoza','affects','discusses','Spinoza considers the power of understanding over affects in Part V.',[ethics]),
 edge('spinoza','conatus','discusses','Each thing strives to persevere in its being, according to Ethics III, proposition 6.',[{...ethics,locator:'Part III, proposition 6'}]),
 edge('sartre','situation','discusses','Freedom is considered in relation to concrete facticity and situation.',[sartre]),
];
