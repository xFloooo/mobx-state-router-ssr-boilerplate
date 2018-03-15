/**
 * Generates a URL from a pattern and parameters.
 * For example,
 *     generateUrl('/departments/:id', { id: 'electronics' })
 *     => '/departments/electronics'
 */
export declare const generateUrl: (pattern?: string, params?: {}, queryParams?: {}) => string;
