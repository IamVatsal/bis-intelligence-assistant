export type UserPersona = 'manufacturer' | 'msme' | 'consumer' | 'student' | 'laboratory' | 'professional';

export type AppLanguage = 'en' | 'hi' | 'gu';

export type QueryIntent =
  | 'STANDARD_SEARCH'
  | 'PRODUCT_STANDARD_RECOMMENDATION'
  | 'CERTIFICATION_QUERY'
  | 'SCHEME_QUERY'
  | 'LICENSING_QUERY'
  | 'TESTING_QUERY'
  | 'LABORATORY_SEARCH'
  | 'HALLMARKING_QUERY'
  | 'CONSUMER_QUERY'
  | 'STANDARD_EXPLANATION'
  | 'CLAUSE_QUERY'
  | 'RELATED_STANDARD_SEARCH'
  | 'GENERAL_BIS_QUERY'
  | 'OUT_OF_SCOPE';

export type EvidenceLevel = 'high' | 'moderate' | 'limited';

export interface BISClause {
  clauseNumber: string;
  title: string;
  pageNumber: number;
  content: string;
  isMandatory?: boolean;
}

export interface BISStandard {
  id: string;
  standardNumber: string;
  title: string;
  year: number;
  edition?: string;
  status: 'Current' | 'Under Revision' | 'Withdrawn';
  category: 'Electrical & Electronics' | 'Mechanical & Metal' | 'Chemical & Plastics' | 'Civil & Structural' | 'Food, Water & Agriculture' | 'Consumer & Toys' | 'Jewellery & Hallmarking';
  scope: string;
  isMandatoryQCO: boolean;
  qcoDetails?: {
    orderName: string;
    ministry: string;
    effectiveDate: string;
    gazetteRef: string;
  };
  scheme: 'Scheme I (ISI Mark)' | 'Scheme II (CRS - Electronics)' | 'Scheme IV (CoC)' | 'Hallmarking' | 'Voluntary';
  keywords: string[];
  keyClauses: BISClause[];
  testingRequirements: string[];
  requiredDocuments: string[];
  relatedStandards: string[];
  sourceUrl: string;
  pdfSampleUrl?: string;
  lastUpdated: string;
}

export interface BISScheme {
  id: string;
  name: string;
  code: string;
  type: string;
  description: string;
  applicableProducts: string[];
  eligibility: string;
  governingRegulation: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    documentsRequired: string[];
    timeline: string;
  }[];
  feesOverview: string;
  applicationPortal: string;
  sourceUrl: string;
}

export interface BISLaboratory {
  id: string;
  name: string;
  type: 'Central Lab' | 'Regional Lab' | 'Branch Lab' | 'Recognized Lab (NABL)';
  state: string;
  city: string;
  address: string;
  contactEmail: string;
  phone: string;
  nablAccreditationNo?: string;
  validUntil?: string;
  productCategories: string[];
  testedStandards: string[];
  keyTests: string[];
  sourceUrl: string;
}

export interface BISCitation {
  documentId: string;
  title: string;
  standardNumber?: string;
  clause?: string;
  page?: number;
  sourceUrl: string;
  excerpt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  intent?: QueryIntent;
  evidenceLevel?: EvidenceLevel;
  evidenceRationale?: string;
  applicableStandards?: BISStandard[];
  citations?: BISCitation[];
  certificationProcess?: string[];
  testingOverview?: string[];
  followUpSuggestions?: string[];
  clarificationNeeded?: boolean;
}

export interface ProductRecommendationRequest {
  productName: string;
  description: string;
  material?: string;
  capacityOrRating?: string;
  intendedUse?: string;
  industryCategory?: string;
}

export interface StandardRecommendationResult {
  standard: BISStandard;
  relevanceScore: number;
  relevanceLevel: 'High' | 'Moderate' | 'Potential';
  whyItApplies: string;
  coverageChecklist: {
    feature: string;
    matched: boolean;
    clauseRef: string;
  }[];
  isMandatory: boolean;
  qcoWarning?: string;
}

export interface FeedbackSubmission {
  messageId: string;
  isHelpful: boolean;
  category?: 'incorrect_info' | 'wrong_standard' | 'missing_source' | 'outdated_info' | 'poor_explanation' | 'wrong_language' | 'other';
  comment?: string;
  timestamp: string;
}

export interface AdminRAGTestResult {
  query: string;
  detectedIntent: QueryIntent;
  expandedQueryTokens: string[];
  retrievedChunksCount: number;
  topChunks: {
    id: string;
    standardNumber?: string;
    title: string;
    clause?: string;
    score: number;
    textExcerpt: string;
  }[];
  generatedAnswer: string;
  citationsValidated: boolean;
  evidenceLevel: EvidenceLevel;
  latencyMs: number;
}
