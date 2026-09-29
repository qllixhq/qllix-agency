import type { CmsData } from "@/lib/cmsStore";

/** Removes dashboard-only records before CMS data is sent to public visitors. */
export function toPublicCmsData(data: CmsData) {
  const {
    orders: _orders,
    inquiries: _inquiries,
    affiliatePartners: _affiliatePartners,
    affiliateLeads: _affiliateLeads,
    general,
    ...publicData
  } = data;
  const { adminPasscode: _adminPasscode, ...publicGeneral } = general;
  return { ...publicData, general: publicGeneral };
}
