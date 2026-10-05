import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export interface Crumb { label: string; href?: string }

export const BlogBreadcrumb = ({ items }: { items: Crumb[] }) => (
  <Breadcrumb className="mb-6">
    <BreadcrumbList className="text-sm">
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && <BreadcrumbSeparator>•</BreadcrumbSeparator>}
          <BreadcrumbItem className="min-w-0">
            {item.href ? (
              <BreadcrumbLink asChild><Link to={item.href}>{item.label}</Link></BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="line-clamp-1 break-words font-medium text-primary">{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        </Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);
