'use client';
import { cookies } from 'next/headers';
import * as React from 'react';
import { useState, useEffect } from 'react';
import api from 'utils/api';
const Refresher = ({ refresher }: { refresher: Function }) => {
	useEffect(() => {
		refresher();
	}, []);
	return null;
};

export default Refresher;
