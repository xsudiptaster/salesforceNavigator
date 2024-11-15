import { create } from 'zustand';

export const useLoadingInfoStore: any = create((set) => ({
  loadingInfo: {
    loading: false,
    showBar: false,
    value: 0,
  },
  setLoadingInfo: (value: any) => set(() => ({ loadingInfo: value })),
}));
export const openTabsStore: any = create((set) => ({
  openTabs: {},
  setOpenTabs: (value: any) => set(() => ({ openTabs: value })),
}));
export const savedOrgStore: any = create((set) => ({
  savedOrg: {},
  setSavedOrg: (value: any) => set(() => ({ savedOrg: value })),
}));
