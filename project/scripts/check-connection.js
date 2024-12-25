import checkServer from './server-check.js';

const main = async () => {
  try {
    console.log('Checking server connection...');
    const result = await checkServer();
    console.log('\nServer Status:', result.health.status);
    console.log('Server Uptime:', Math.floor(result.health.server.uptime / 60), 'minutes');
    console.log('Node Version:', result.health.server.nodeVersion);
    console.log('\nAPI Test Result:', result.test.success ? 'Success' : 'Failed');
  } catch (error) {
    console.error('\nConnection Failed:', error.message);
    console.log('\nPossible issues:');
    console.log('1. Server is not running');
    console.log('2. Firewall is blocking port 5001');
    console.log('3. Network connectivity issues');
    console.log('\nTo resolve:');
    console.log('1. SSH into your DigitalOcean droplet:');
    console.log('   ssh root@159.223.0.84');
    console.log('2. Check if the server is running:');
    console.log('   pm2 list');
    console.log('3. Check server logs:');
    console.log('   pm2 logs');
    console.log('4. Verify firewall settings:');
    console.log('   sudo ufw status');
  }
};

main();