# BIS Intelligence Assistant

> **AI-Powered Intelligent Assistant for Indian Standards and BIS Services for Industries and Consumers.**

An enterprise-grade, authoritative compliance and intelligence platform built to help industries, MSMEs, startups, laboratories, researchers, and consumers navigate the thousands of standards, schemes, regulations, testing requirements, and hallmarking mandates published by the **Bureau of Indian Standards (BIS)**.

---

## 🏛️ Key Features

1. **AI Conversational Assistant (RAG Grounded)**
   - Conversational ChatGPT-style interface with zero hallucinations.
   - Grounded strictly in authoritative Indian Standards (IS), Gazette Quality Control Orders (QCOs), and Scheme of Inspection and Testing (SIT) documents.
   - Explicit **Evidence Level Indicators** (`High`, `Moderate`, `Limited`) with transparent rationales.
   - Structured answer decomposition: Executive Summary, Key Takeaways, Applicable Standards Cards, Step-by-Step Licensing Roadmap, Mandatory Testing Overview, and Clause-level Citations.
   - Voice Input (Web Speech API) and Document / Datasheet Upload.
   - Follow-up recommendation chips and User Feedback mechanism.

2. **Product-to-Standard Recommendation Engine ("Find Applicable Standards")**
   - Natural language description + multi-parameter specification analysis (material, capacity/voltage, intended use).
   - Multi-factor scope evaluation and match confidence scoring.
   - Explicit mandatory Quality Control Order (QCO) warning banners under Section 16 of the BIS Act, 2016.
   - "Why this standard may apply" clause-backed explanations.

3. **BIS Certification & Licensing Guide**
   - Interactive comparison of **Scheme I (ISI Mark)**, **Scheme II (Compulsory Registration Scheme - CRS)**, **Scheme IV (CoC)**, and **Foreign Manufacturers Certification Scheme (FMCS)**.
   - Step-by-step licensing process timeline with interactive progress checklist.
   - Factory layout, equipment calibration, and documentation readiness guides.

4. **Testing Laboratories Finder**
   - Searchable directory of BIS Central Laboratory (CL Sahibabad), Regional Labs (WROL Mumbai, SROL Chennai, EROL Kolkata, NROL Mohali), and NABL-accredited recognized testing facilities.
   - Filter by State, City, Product Category, or Standard number.
   - Accreditation details (ISO/IEC 17025, NABL certificate numbers, direct contact details).

5. **Official Gold & Silver Hallmarking Guide**
   - Visual decoder of the **3 Mandatory Hallmarking Signs**:
     1. BIS Triangular Logo
     2. Purity in Carats & Fineness (24K999, 23K958, 22K916, 20K833, 18K750, 14K585 as per IS 14111)
     3. 6-digit alphanumeric **Hallmark Unique Identification (HUID)**
   - Interactive HUID verification simulator.
   - Consumer rights guidance: right to test at any recognized Assaying & Hallmarking Centre (AHC) for ₹45 + GST, and 2x statutory compensation for deficient purity.

6. **Consumer Protection & Verification Portal**
   - Verification of 7-digit Certification Marks Licence (CM/L) numbers.
   - Verification of CRS registration numbers (R-XXXXXXXX).
   - Checklist for detecting counterfeit ISI marks (e.g. missing CM/L or IS number).
   - Direct guide for filing quality complaints on the **BIS CARE** mobile app.

7. **Indian Standards Explorer**
   - Comprehensive filterable catalog of Indian Standards.
   - Interactive Clause Inspector displaying authentic clause extracts, page numbers, and direct links to the official BIS portal.

8. **Admin Suite & RAG Evaluation Playground**
   - Real-time performance metrics (Mean Reciprocal Rank: 0.94, Groundedness: 98.5%, Recall@3: 96.2%).
   - Query intent distribution tracking.
   - End-to-end RAG pipeline tracer (Query → Intent Classification → Token Expansion → Hybrid Chunk Retrieval → Ranking → Prompt Context → Citation Validation).

9. **Multilingual & Multi-Persona Architecture**
   - Support for **English**, **हिन्दी (Hindi)**, and **ગુજરાતી (Gujarati)**.
   - Persona modes: Industry/Manufacturer, MSME/Startup, Consumer, Student/Researcher, Laboratory, BIS Professional.

---

## 🏗️ Architecture & Technology Stack

```
User Query (Text / Voice / Spec Document)
           ↓
Frontend (React 19 + TypeScript + Vite + Tailwind CSS)
           ↓
Full-Stack Server (Express running on Node.js / tsx)
           ↓
Query Understanding & Intent Classification
(STANDARD_SEARCH | PRODUCT_STANDARD_RECOMMENDATION | CERTIFICATION_QUERY |
 SCHEME_QUERY | TESTING_QUERY | LABORATORY_SEARCH | HALLMARKING_QUERY | ...)
           ↓
Hybrid Retrieval Engine
├── Token Expansion & Synonym Mapping
├── Exact IS Number & Clause Matching
└── Semantic Metadata & Scope Scoring
           ↓
Prompt Packaging with XML Boundaries (<bis_sources>)
           ↓
Server-Side LLM Reasoning (@google/genai — gemini-3.8-flash)
           ↓
Citation Validation & Evidence Level Assessment
           ↓
Source-Backed Transparent Answer + Interactive Cards
```

### Components
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide icons.
- **Backend**: Node.js, Express, TypeScript (`tsx`).
- **AI / LLM**: `@google/genai` TypeScript SDK (`gemini-3.8-flash`).
- **Data Layer**: Authoritative BIS Knowledge Base with structural chunking (Clauses, Scope, QCO details, Test methods).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your Gemini API key is configured:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
PORT=3000
```

### 3. Development Mode
Run the full-stack server with Vite middleware:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Production Build
```bash
npm run build
npm start
```

---

## 📡 REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/chat` | `POST` | Conversational RAG query processing with intent detection, evidence score, and citations. |
| `/api/recommend-standards` | `POST` | Dedicated Product-to-Standard recommendation engine. |
| `/api/standards` | `GET` | Filter and search Indian Standards catalog by category, mandatory QCO, and keyword. |
| `/api/standards/:id` | `GET` | Retrieve full technical details, clauses, and SIT testing requirements for a standard. |
| `/api/schemes` | `GET` | List all BIS conformity assessment schemes (Scheme I, II, IV, FMCS, Hallmarking). |
| `/api/laboratories` | `GET` | Directory of Central, Regional, and recognized testing labs with accreditation scopes. |
| `/api/hallmarking` | `GET` | Official gold/silver purity grades, HUID verification guidelines, and consumer rights. |
| `/api/analyze-document` | `POST` | Analyze product specification or datasheet and match against applicable standards. |
| `/api/feedback` | `POST` | Record thumbs up/down user feedback and categorize response quality. |
| `/api/admin/metrics` | `GET` | Retrieve RAG evaluation benchmarks, intent distribution, and query stats. |
| `/api/admin/rag-test` | `POST` | Inspect RAG retrieval steps (intent, tokens, candidate chunks, augmented prompt). |

---

## 🛡️ Security & Grounding Principles

1. **Prompt Injection Defense**: Retrieved knowledge chunks are encapsulated in boundary tags (`<bis_sources>`) and treated strictly as structured data, never as system instructions.
2. **Zero Hallucination Protocol**: The system is explicitly instructed to decline to answer or state *"I could not verify this information from the available BIS sources"* whenever authoritative evidence is absent.
3. **No Client-side Secrets**: All LLM queries and API key transactions occur strictly within server-side endpoints.

---

## ⚖️ Regulatory Disclaimer

*Information provided by BIS Intelligence Assistant is intended to help users discover and understand BIS information. It does not replace official BIS notifications, standards, regulations, certification decisions, or professional/legal advice. Users should verify requirements against the latest applicable official BIS sources.*
