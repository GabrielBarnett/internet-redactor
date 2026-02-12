import type { SupportedSite } from '@internet-redactor/shared';

interface SiteSelectorProps {
  value: SupportedSite;
  onChange: (site: SupportedSite) => void;
}

const supportedSites: SupportedSite[] = ['reddit', 'youtube', 'facebook', 'legacy-forum'];

export function SiteSelector({ value, onChange }: SiteSelectorProps): JSX.Element {
  return (
    <label>
      Website
      <select value={value} onChange={(event) => onChange(event.target.value as SupportedSite)}>
        {supportedSites.map((site) => (
          <option key={site} value={site}>
            {site}
          </option>
        ))}
      </select>
    </label>
  );
}
