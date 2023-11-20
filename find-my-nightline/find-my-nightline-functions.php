<?php
/**
 * Find My Nightline Functions
 *
 * @package NightlineAssociation/FindMyNightline
 */

/**
 * Contacts the Find My Nightline endpoint for a collection of data.
 *
 * @return string
 */
function get_nightlines() {
	$response = wp_remote_get( nla_get_portal_institutions_endpoint() );

	return wp_remote_retrieve_body( $response );
}

/**
 * Returns the endpoint URI.
 *
 * @return string
 */
function nla_get_portal_institutions_endpoint() {
	return 'https://portal.nightline.ac.uk/api/institutions.json';
}
