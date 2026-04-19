-- Align derived_content_assets.asset_type CHECK with application-supported types (facilitator / team assets).
-- Safe: additive expansion only; existing rows unchanged.

alter table public.derived_content_assets
  drop constraint if exists derived_content_assets_type_check;

alter table public.derived_content_assets
  add constraint derived_content_assets_type_check check (
    asset_type in (
      'study_notes',
      'revision_sheet',
      'trainer_guide',
      'handout',
      'slide_outline',
      'faq_sheet',
      'educational_brief',
      'refresher_handout',
      'manager_coaching_brief',
      'facilitator_discussion_guide',
      'team_recap_sheet'
    )
  );

comment on constraint derived_content_assets_type_check on public.derived_content_assets is
  'Allowed derived asset kinds — keep in sync with DerivedContentAssetType in src/knowledge/types.ts';
