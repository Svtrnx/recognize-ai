<?php

if ($_SERVER['REQUEST_URI'] === '/ai/recognize') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: *");

	$postData2 = file_get_contents('php://input');
	
	$data = json_decode($postData2, true);

	
	if ($data !== null) {
		$fileUrl = $data['file_url'];
	} else {
		echo 'JSON error';
	}


    $postData = json_encode(array(
        'file_url' => $fileUrl
    ));

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'http://localhost:8000/ai/recognize');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
    ));

    $response = curl_exec($ch);

    curl_close($ch);

    $data = json_decode($response, true);

    $result = $data['result'];


    echo $result;
}

?>
