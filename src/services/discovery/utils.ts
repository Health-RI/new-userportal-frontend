// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
import { ExtendedSession } from '@/utils/auth';
import { Dataset } from '../../types/dataset.types';
import { CKANPackage } from './types/package.types';
import { decrypt } from '@/utils/encryption';
import { DatasetSearchQuery, Facet, FacetGroup, facetToLabelMapping } from './types/packageSearch.types';

export const mapCKANPackageToDataset = (ckanPackage: CKANPackage): Dataset => {
  return {
    accessRights: ckanPackage.access_rights,
    alternateIdentifier: ckanPackage.alternate_identifier,
    author: {
      name: ckanPackage.author,
      email: ckanPackage.author_email,
    },
    contact: {
      contactEmail: ckanPackage.contact_email,
      contactName: ckanPackage.contact_name,
      contactUri: ckanPackage.contact_uri,
    },
    creator: {
      name: ckanPackage.creator,
      userId: ckanPackage.creator_user_id,
    },
    version: {
      hasVersion: ckanPackage.has_version,
      isVersionOf: ckanPackage.is_version_of,
      version: ckanPackage.version,
      notes: ckanPackage.version_notes,
    },
    license: {
      id: ckanPackage.license_id,
      title: ckanPackage.license_title,
    },
    organization: {
      id: ckanPackage.organization.id,
      name: ckanPackage.organization.name,
      title: ckanPackage.organization.title,
    },
    maintainer: {
      name: ckanPackage.maintainer,
      email: ckanPackage.maintainer_email,
    },
    publisher: {
      email: ckanPackage.publisher_email,
      name: ckanPackage.publisher_name,
      type: ckanPackage.publisher_type,
      url: ckanPackage.publisher_url,
    },
    keywords: (ckanPackage.tags || []).map((tag) => ({
      id: tag.id,
      name: tag.name,
      displayName: tag.display_name,
    })),
    conformsTo: ckanPackage.conforms_to,
    dcatType: ckanPackage.dcat_type,
    documentation: ckanPackage.documentation,
    frequency: ckanPackage.frequency,
    id: ckanPackage.id,
    identifier: ckanPackage.identifier,
    isReferencedBy: ckanPackage.is_referenced_by,
    isOpen: ckanPackage.isopen,
    landingPage: ckanPackage.landing_page,
    languages: ckanPackage.language,
    metadataCreated: ckanPackage.metadata_created,
    metadataModified: ckanPackage.metadata_modified,
    name: ckanPackage.name,
    notes: ckanPackage.notes,
    numResources: ckanPackage.num_resources,
    numTags: ckanPackage.num_tags,
    ownerOrg: ckanPackage.owner_org,
    private: ckanPackage.private,
    provenance: ckanPackage.provenance,
    qualifiedAttribution: ckanPackage.qualified_attribution,
    qualifiedRelation: ckanPackage.qualified_relation,
    relation: ckanPackage.relation,
    sample: ckanPackage.sample,
    source: ckanPackage.source,
    spatialResolutionInMeters: ckanPackage.spatial_resolution_in_meters,
    spatialUri: ckanPackage.spatial_uri,
    state: ckanPackage.state,
    temporalResolution: ckanPackage.temporal_resolution,
    theme: ckanPackage.theme,
    title: ckanPackage.title,
    type: ckanPackage.type,
    url: ckanPackage.url,
    wasGeneratedBy: ckanPackage.was_generated_by,
    distributions: ckanPackage.resources.map((resource) => ({
      accessServices: resource.access_services,
      accessUrl: resource.access_url,
      availability: resource.availability,
      cacheLastUpdated: resource.cache_last_updated,
      cacheUrl: resource.cache_url,
      compressFormat: resource.compress_format,
      conformsTo: resource.conforms_to,
      created: resource.created,
      description: resource.description,
      documentation: resource.documentation,
      downloadUrl: resource.download_url,
      format: resource.format,
      hasPolicy: resource.has_policy,
      hash: resource.hash,
      hashAlgorithm: resource.hash_algorithm,
      id: resource.id,
      issued: resource.issued,
      language: resource.language,
      lastModified: resource.last_modified,
      metadataModified: resource.metadata_modified,
      mimetype: resource.mimetype,
      mimetypeInner: resource.mimetype_inner,
      modified: resource.modified,
      name: resource.name,
      packageFormat: resource.package_format,
      packageId: resource.package_id,
      position: resource.position,
      resourceType: resource.resource_type,
      rights: resource.rights,
      spatialResolutionInMeters: resource.spatial_resolution_in_meters,
      state: resource.state,
      status: resource.status,
      temporalResolution: resource.temporal_resolution,
      url: resource.url,
      urlType: resource.url_type,
    })),
  };
};

export const constructSearchUrl = (discoveryUrl: string): string => {
  return `${discoveryUrl}//api/v1/datasets/search`;
};

export const createHeaders = (session?: ExtendedSession): Record<string, string> => {
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${decrypt(session.access_token)}`;
  }

  return headers;
};

export const DEFAULT_DATASET_SEARCH_QUERY: DatasetSearchQuery = {
  rows: 0,
};

export const flattenFacets = (facetGroups: FacetGroup[]): Facet[] => {
  let facets: Facet[] = [];

  for (let group of facetGroups) {
    facets = [
      ...facets,
      ...group.facets.map((facet) => ({ label: facetToLabelMapping[facet.label] ?? facet.label, values: facet.values })),
    ];
  }

  return facets;
};
