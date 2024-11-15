import { useTrackPermissionChangesStore } from '../stores/stores';
import { unionBy } from './list.util';

const cleanPermission = (p: any) => {
  if (typeof p === 'string') {
    return p === 'true';
  }
  return p;
};
export const cleanUpProfilesOrPermissionSets = (p: any) => {
  const type = p.fileName.split('/')[0];
  if (p.classAccesses && !Array.isArray(p.classAccesses)) {
    p.classAccesses = [p.classAccesses];
  }
  if (p.fieldPermissions && !Array.isArray(p.fieldPermissions)) {
    p.fieldPermissions = [p.fieldPermissions];
  }
  if (p.flowAccesses && !Array.isArray(p.flowAccesses)) {
    p.flowAccesses = [p.flowAccesses];
  }
  if (p.objectPermissions && !Array.isArray(p.objectPermissions)) {
    p.objectPermissions = [p.objectPermissions];
  }
  if (p.pageAccesses && !Array.isArray(p.pageAccesses)) {
    p.pageAccesses = [p.pageAccesses];
  }
  if (p.recordTypeVisibilities && !Array.isArray(p.recordTypeVisibilities)) {
    p.recordTypeVisibilities = [p.recordTypeVisibilities];
  }
  if (type === 'permissionSet') {
    if (p.tabSettings && !Array.isArray(p.tabSettings)) {
      p.tabVisibilities = [p.tabSettings];
    } else if (p.tabSettings) {
      p.tabVisibilities = p.tabSettings;
    }
  } else if (p.tabVisibilities && !Array.isArray(p.tabVisibilities)) {
    p.tabVisibilities = [p.tabVisibilities];
  }
  if (p.userPermissions && !Array.isArray(p.userPermissions)) {
    p.userPermissions = [p.userPermissions];
  }
  if (p.classAccesses) {
    p.classAccesses = p.classAccesses.map((perm: any) => {
      return {
        apexClass: perm.apexClass,
        enabled: cleanPermission(perm.enabled),
      };
    });
  }
  if (p.fieldPermissions) {
    p.fieldPermissions = p.fieldPermissions.map((perm: any) => {
      return {
        field: perm.field,
        editable: cleanPermission(perm.editable),
        readable: cleanPermission(perm.readable),
      };
    });
  }
  if (p.objectPermissions) {
    p.objectPermissions = p.objectPermissions.map((perm: any) => {
      return {
        object: perm.object,
        allowCreate: cleanPermission(perm.allowCreate),
        allowDelete: cleanPermission(perm.allowDelete),
        allowEdit: cleanPermission(perm.allowEdit),
        allowRead: cleanPermission(perm.allowRead),
        modifyAllRecords: cleanPermission(perm.modifyAllRecords),
        viewAllRecords: cleanPermission(perm.viewAllRecords),
      };
    });
  }
  if (p.flowAccesses) {
    p.flowAccesses = p.flowAccesses.map((perm: any) => {
      return {
        flow: perm.flow,
        enabled: cleanPermission(perm.enabled),
      };
    });
  }
  if (p.pageAccesses) {
    p.pageAccesses = p.pageAccesses.map((perm: any) => {
      return {
        apexPage: perm.apexPage,
        enabled: cleanPermission(perm.enabled),
      };
    });
  }
  if (p.recordTypeVisibilities) {
    p.recordTypeVisibilities = p.recordTypeVisibilities.map((perm: any) => {
      return {
        recordType: perm.recordType,
        default: cleanPermission(perm.default),
        visible: cleanPermission(perm.visible),
      };
    });
  }
  if (p.userPermissions) {
    p.userPermissions = p.userPermissions.map((perm: any) => {
      return {
        name: perm.name,
        enabled: cleanPermission(perm.enabled),
      };
    });
  }
  p.type = type;
  return p;
};
export const getOriginalPermission = (
  p: any,
  permissionType: string,
  permission: any,
  tagName: string,
) => {
  if (p[permissionType]) {
    const originalPermission = p[permissionType].find(
      (fp: any) => fp[tagName] === permission[tagName],
    );
    if (originalPermission) {
      return originalPermission;
    }
  }
  return permission;
};
export const getCurrentPermission = (
  trackPermissionChanges: any,
  p: any,
  permissionType: string,
  permission: any,
  tagName: string,
) => {
  const changes = { ...trackPermissionChanges };
  if (changes[p.fileName] && changes[p.fileName][permissionType]) {
    const foundPermission = changes[p.fileName][permissionType].find(
      (perm: any) => perm[tagName] === permission[tagName],
    );
    if (foundPermission) {
      return foundPermission;
    }
  }
  return getOriginalPermission(p, permissionType, permission, tagName);
};
export const trackChanges = (
  p: any,
  permissionType: string,
  permission: any,
  tagName: string,
) => {
  const { trackPermissionChanges } = useTrackPermissionChangesStore.getState();
  const { setTrackPermissionChanges } =
    useTrackPermissionChangesStore.getState();
  const changes = { ...trackPermissionChanges };
  if (changes[p.fileName]) {
    if (changes[p.fileName][permissionType]) {
      let restPermissions = changes[p.fileName][permissionType].filter(
        (perm: any) => perm[tagName] !== permission[tagName],
      );
      restPermissions = [...restPermissions, permission];
      changes[p.fileName][permissionType] = restPermissions;
    } else {
      changes[p.fileName][permissionType] = [];
      let restPermissions = changes[p.fileName][permissionType].filter(
        (perm: any) => perm[tagName] !== permission[tagName],
      );
      restPermissions = [...restPermissions, permission];
      changes[p.fileName][permissionType] = restPermissions;
    }
  } else {
    changes[p.fileName] = {};
    changes[p.fileName][permissionType] = [];
    let restPermissions = changes[p.fileName][permissionType].filter(
      (perm: any) => perm[tagName] !== permission[tagName],
    );
    restPermissions = [...restPermissions, permission];
    changes[p.fileName][permissionType] = restPermissions;
  }
  setTrackPermissionChanges(changes);
};
const mergePermissions = (
  oldPermissions: [],
  newPermissions: any[],
  tagName: string,
) => {
  const oldArray = oldPermissions || [];
  const newArray = newPermissions || [];
  return unionBy(oldArray, newArray, tagName);
};
export const createProfileAndPermissionSet = (pList: any) => {
  const { trackPermissionChanges } = useTrackPermissionChangesStore.getState();
  const profilesToUpdate: any[] = [];
  pList.forEach((p: any) => {
    if (trackPermissionChanges[p.fileName]) {
      const tempProf = JSON.parse(JSON.stringify(p));
      tempProf.fullName = p.fullName;
      if (p.type === 'permissionSet') {
        tempProf.label = p.label;
      }
      const pChanges = trackPermissionChanges[p.fileName];
      tempProf.objectPermissions = mergePermissions(
        tempProf.objectPermissions ? tempProf.objectPermissions : [],
        pChanges.objectPermissions ? pChanges.objectPermissions : [],
        'object',
      );
      tempProf.recordTypeVisibilities = mergePermissions(
        tempProf.recordTypeVisibilities ? tempProf.recordTypeVisibilities : [],
        pChanges.recordTypeVisibilities ? pChanges.recordTypeVisibilities : [],
        'recordType',
      );
      tempProf.fieldPermissions = mergePermissions(
        tempProf.fieldPermissions ? tempProf.fieldPermissions : [],
        pChanges.fieldPermissions ? pChanges.fieldPermissions : [],
        'field',
      );
      tempProf.classAccesses = mergePermissions(
        tempProf.classAccesses ? tempProf.classAccesses : [],
        pChanges.classAccesses ? pChanges.classAccesses : [],
        'apexClass',
      );
      tempProf.pageAccesses = mergePermissions(
        tempProf.pageAccesses ? tempProf.pageAccesses : [],
        pChanges.pageAccesses ? pChanges.pageAccesses : [],
        'apexPage',
      );
      if (tempProf.type === 'permissionSet') {
        tempProf.tabSettings = mergePermissions(
          tempProf.tabVisibilities ? tempProf.tabVisibilities : [],
          pChanges.tabVisibilities ? pChanges.tabVisibilities : [],
          'tab',
        );
        delete tempProf.tabVisibilities;
      } else {
        tempProf.tabVisibilities = mergePermissions(
          tempProf.tabVisibilities ? tempProf.tabVisibilities : [],
          pChanges.tabVisibilities ? pChanges.tabVisibilities : [],
          'tab',
        );
      }
      tempProf.userPermissions = unionBy(
        tempProf.userPermissions ? tempProf.userPermissions : [],
        pChanges.userPermissions ? pChanges.userPermissions : [],
        'name',
      );
      delete tempProf['@xsi:type'];
      delete tempProf.fileName;
      delete tempProf.type;
      profilesToUpdate.push(tempProf);
    }
  });
  return profilesToUpdate;
};
