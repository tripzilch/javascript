function HN_get_user(item_id) {
	return $('a[href="item?id=' + item_id + '"]').previousElementSibling
}