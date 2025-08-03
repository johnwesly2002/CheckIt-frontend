import React from "react";

export default function Truncatetext({ text, limit = 90 }) {
	if (text?.length > limit) {
		return text.slice(0, limit) + "...";
	}
	return text;
}
