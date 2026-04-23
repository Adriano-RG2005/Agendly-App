import { Availability } from "@domain/entities/Availability";

export interface IAvailabilityRepository {
  upsert(props: {
    businessId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isActive: boolean;
  }): Promise<Availability>;

  findByBusiness(businessId: string): Promise<Availability[]>;
  findActiveByBusiness(businessId: string): Promise<Availability[]>;
}
    