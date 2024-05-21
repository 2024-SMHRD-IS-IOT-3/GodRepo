const oracledb = require('oracledb');
oracledb.initOracleClient({ libDir: '../instantclient_11_2' });

async function connectToOracle() {
    try {
        // 연결 정보 설정
        const connection = await oracledb.getConnection({
            user: 'cgi_24IS_IoT3_p2_3',
            password: 'smhrd3',
            connectString: 'project-db-cgi.smhrd.com:1524'
        });
        // console.log('Oracle 데이터베이스에 연결되었습니다.');
        return connection
    } 
    catch (error) {
        console.error('Oracle 데이터베이스에 연결하는 중 오류가 발생했습니다:', error)
        throw error;
    }
}

module.exports = connectToOracle
