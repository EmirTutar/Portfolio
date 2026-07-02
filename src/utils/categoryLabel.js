export function categoryLabel(cat, t) {
  if (cat === 'work')    return t('projects.category_work')
  if (cat === 'study')   return t('projects.category_study')
  return t('projects.category_private')
}
