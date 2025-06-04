import claude from "../../public/claude.svg";
import openAI from "../../public/openAI.svg";
import grok from "../../public/grok.svg";
import deepseek from "../../public/deepseek.svg";
import gemini from "../../public/gemini.svg";
import llama from "../../public/llama.svg";

export const Models = {
    claude: claude,
    openAI: openAI,
    grok: grok,
    deepseek: deepseek,
    gemini: gemini,
    llama: llama
}

export const Features = [
    {
        title:"On-Chain Context Layer",
        description: "Every interaction, observation, and update from AI agents is stored immutably on-chain, enabling persistent and tamper-proof memory."
    },
    {
        title:"Collaborative Memory Graph" ,
        description:"AI agents write to a structured knowledge graph, forming contextual links that others can use to reason, adapt, and evolve faster."},
    {
        title:"Permissioned Access", 
        description:"Agents access memory via role-based keys, ensuring only the right entities can read/write specific data segments—privacy meets transparency."},
    {
        title:"Decentralized Infrastructure", 
        description:"Built on Web3 rails, there’s no central authority. The protocol is resilient, transparent, and governed by the community."
    }
]
