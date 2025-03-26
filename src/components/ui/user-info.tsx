import { FC } from 'react';
import { MapPin, Building, GraduationCap, FileText } from 'lucide-react';

interface UserInfoProps {
  bio?: string;
  country?: string;
  city?: string;
  company?: string;
  college?: string;
}

const UserInfo: FC<UserInfoProps> = ({ bio, country, city, company, college }) => {
  return (
    <div className="flex flex-col space-y-3">
      {bio && (
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm">{bio}</p>
        </div>
      )}

      {(country || city) && (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <p className="text-sm">
            {country}
            {country && city && ', '}
            {city}
          </p>
        </div>
      )}

      {company && (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <p className="text-sm">{company}</p>
        </div>
      )}

      {college && (
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-amber-500 flex-shrink-0" />
          <p className="text-sm">{college}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
