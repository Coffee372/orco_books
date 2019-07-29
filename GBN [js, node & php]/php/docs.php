<?php

use function GuzzleHttp\json_encode;

require __DIR__ . '/vendor/autoload.php';

if (php_sapi_name() != 'cli') {
    throw new Exception('This application must be run on the command line.');
}

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient()
{
    $client = new Google_Client();
    $client->setApplicationName('Google Docs');
    $client->setScopes(Google_Service_Docs::DOCUMENTS);
    $client->setAuthConfig('credentials.json');
    $client->setAccessType('offline');
    $client->setPrompt('select_account consent');

    // Load previously authorized token from a file, if it exists.
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    $tokenPath = 'token2.json';
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    }

    // If there is no previous token or it's expired.
    if ($client->isAccessTokenExpired()) {
        // Refresh the token if possible, else fetch a new one.
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
            printf("Open the following link in your browser:\n%s\n", $authUrl);
            print 'Enter verification code: ';
            $authCode = trim(fgets(STDIN));

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
            $client->setAccessToken($accessToken);

            // Check to see if there was an error.
            if (array_key_exists('error', $accessToken)) {
                throw new Exception(join(', ', $accessToken));
            }
        }
        // Save the token to a file.
        if (!file_exists(dirname($tokenPath))) {
            mkdir(dirname($tokenPath), 0700, true);
        }
        file_put_contents($tokenPath, json_encode($client->getAccessToken()));
    }
    return $client;
}

// Get the API client and construct the service object.
$client = getClient();
$service = new Google_Service_Docs($client);

// Print the names and IDs for up to 10 files.
//$optParams = array('documentId' => '19Wjv4fX3ro65CJySi4OPXpPUj4aINiGvxscmg0Vm5p8');
$documentId = '19Wjv4fX3ro65CJySi4OPXpPUj4aINiGvxscmg0Vm5p8';
$results = $service->documents->get($documentId);
//print gettype($results);
//$total = count((array) $results);
$jsonData = $results->getBody()->getContent()[16]->getTable()->getTableRows()[0]->getTableCells()[0]
    ->getContent()[1]->getTable()->getTableRows()[0]->getTableCells()[1]->getContent()[0]
    ->getParagraph()->getElements()[0]->getTextRun()->getContent();

$res_arr = [];
$jsonData_len = $results->getBody()->getContent();
$jsonData_len_en = json_encode($jsonData_len, JSON_PRETTY_PRINT);
$json_sizeof = sizeof($jsonData_len);
$json_sizeof = 20;
// $k = 0;
// $query = $results->getBody()->getContent()[$k]->getTable();

// if ($query == NULL) {
//     echo "This is Null";
// } else {
//     echo "This is not";
// }

//print gettype($query);

for ($m = 0; $m <= $json_sizeof; $m++) {
    if ($results->getBody()->getContent()[$m]->getTable() !== NULL) {
        //$res_arr[$m];
        //echo "This is Not Null .$m.\n";
        array_push($res_arr, $m);
    }
}
array_splice($res_arr, 0, 2);
$parr = [];
//print sizeof($res_arr);

$res_arr_len = sizeof($res_arr);
$res_arr_len = 2;

for ($j = 0; $j <= $res_arr_len; $j++) {
    $ty = $res_arr[$j];

    $Notes_Data = $results->getBody()->getContent()[$ty]->getTable()->getTableRows()[0]->getTableCells()[0]
        ->getContent()[1]->getTable()->getTableRows()[0]->getTableCells()[1]->getContent()[0]
        ->getParagraph()->getElements()[0]->getTextRun()->getContent();

    array_push($parr, $Notes_Data);

    //echo ($ty);
    //echo ($Notes_Data);
}

print gettype($parr);

//echo ($parr);

file_put_contents("data2.json", json_encode($parr, JSON_PRETTY_PRINT));

// Get Name of book
// If table doesn't exist create table SQL
//Insert array data into MYSQL


//var_dump($m);

//echo ($res_arr);
//print_r($res_arr);

// foreach($json_sizeof as $i) {

// }

//print($json_sizeof);

//print($res_arr);
//print_r($jsonData_len);

// .paragraph.elements[0].textRun
//             .content
//$jsonData = $results->getBody()->getContent()->getTable()->getTableRows()->getTableCells()->getContent()
//$populated_notes = (json_encode($jsonData[13]));
//print_r($populated_notes);
//print_r($jsonData_len_en);
//print_r(json_encode($jsonData_len, JSON_PRETTY_PRINT));
// print sizeof($jsonData_len);

// print_r($jsonData->startIndex);
//var_dump($jsonData);
//print_r($results->getBody()->getContent());
//print_r($jsonData);
//echo ($jsonData);

//print($results);
// $body = $results->getBody();
//$jsonData = json_encode($body);
//print $jsonData;
//print_r($body);


//print gettype($body);
