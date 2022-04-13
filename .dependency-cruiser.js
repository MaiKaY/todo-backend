module.exports = {
    extends: 'dependency-cruiser/configs/recommended',
    forbidden: [
        {
            name: 'domain-not-to-application',
            comment: 'Domain should not depend on application.',
            severity: 'error',
            from: { path: '^1.domain' },
            to: { path: '^2.application' }
        },
        {
            name: 'domain-not-to-infrastructure',
            comment: 'Domain should not depend on infrastructure.',
            severity: 'error',
            from: { path: '^1.domain' },
            to: { path: '^3.infrastructure' }
        },
        {
            name: 'domain-not-to-bin',
            comment: 'Domain should not depend on bin.',
            severity: 'error',
            from: { path: '^1.domain' },
            to: { path: '^4.bin' }
        },
        {
            name: 'domain-not-to-cdk',
            comment: 'Domain should not depend on cdk.',
            severity: 'error',
            from: { path: '^1.domain' },
            to: { path: '^5.cdk' }
        }
    ]
};
