import { authService } from '@/services/authService'
import { SonnerNotificationAdapter } from './notifications/SonnerNotificationAdapter'
import { InformationRepositoryImpl } from './repositories/InformationRepositoryImpl'
import { ResearcherRepositoryImpl } from './repositories/ResearcherRepositoryImpl'

export const informationRepository = new InformationRepositoryImpl()
export const researcherRepository = new ResearcherRepositoryImpl()
export const notificationAdapter = new SonnerNotificationAdapter()
export { authService }
