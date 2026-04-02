import { baseItems, checklistRules } from "../data/checklists";

/**
 * Generates a context-aware checklist
 * @param {object} trip - { climate, tripType, travelers, duration }
 * @returns {string[]} - array of checklist items
 */
export function generateChecklist(trip) {
  const items = [...baseItems];

  checklistRules.forEach((rule) => {
    if (rule.condition(trip)) {
      items.push(...rule.items);
    }
  });

  // Remove duplicates
  return [...new Set(items)];
}