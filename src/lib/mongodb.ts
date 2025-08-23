import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dashboardDbName = process.env.DASHBOARD_MONGODB_DB as string;
const reflawoodDbName = process.env.REFLAWOOD_MONGODB_DB as string;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!dashboardDbName || !reflawoodDbName) {
  throw new Error('Please define both DASHBOARD_MONGODB_DB and REFLAWOOD_MONGODB_DB environment variables');
}

let cachedClient: MongoClient | null = null;
let cachedDashboardDb: Db | null = null;
let cachedHestiaDb: Db | null = null;

export async function connectToDatabase(dbType: 'dashboard' | 'reflawood') {
  if (!cachedClient) {
    cachedClient = await MongoClient.connect(uri);
  }

  if (dbType === 'dashboard') {
    if (!cachedDashboardDb) {
      cachedDashboardDb = cachedClient.db(dashboardDbName);
    }
    return { client: cachedClient, db: cachedDashboardDb };
  } else if (dbType === 'reflawood') {
    if (!cachedHestiaDb) {
      cachedHestiaDb = cachedClient.db(reflawoodDbName);
    }
    return { client: cachedClient, db: cachedHestiaDb };
  }
  
  throw new Error('Invalid database type. Use "dashboard" or "reflawood"');
}