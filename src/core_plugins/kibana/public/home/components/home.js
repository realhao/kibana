import React from 'react';
import PropTypes from 'prop-types';
import { Synopsis } from './synopsis';
import {
  KuiLinkButton,
  KuiFlexGroup,
  KuiFlexItem,
  KuiFlexGrid,
} from 'ui_framework/components';
import { FeatureCatalogueCategory } from 'ui/registry/feature_catalogue';

export function Home({ addBasePath, directories, t }) {

  const renderDirectories = (category) => {
    return directories
      .filter((directory) => {
        return directory.showOnHomePage && directory.category === category;
      })
      .map((directory) => {
        return (
          <KuiFlexItem style={{ minHeight: 64 }} key={directory.id}>
            <Synopsis
              description={t(directory.description)}
              iconUrl={addBasePath(directory.icon)}
              title={t(directory.title)}
              url={addBasePath(directory.path)}
            />
          </KuiFlexItem>
        );
      });
  };


  return (
    <div className="kuiView home">
      <div className="kuiViewContent">

        <div className="kuiViewContentItem kuiVerticalRhythmXLarge">
          <KuiFlexGroup
            className="kuiVerticalRhythmSmall"
            justifyContent="spaceBetween"
            alignItems="flexEnd"
          >
            <KuiFlexItem>
              <h1 className="kuiTitle">
                {t('Welcome to Kibana')}
              </h1>
            </KuiFlexItem>

            <KuiFlexItem grow={false}>
              <KuiFlexGroup alignItems="center">
                <KuiFlexItem grow={false}>
                  <p className="kuiText kuiSubduedText">
                    {t('Data already in Elasticsearch?')}
                  </p>
                </KuiFlexItem>

                <KuiFlexItem grow={false}>
                  <KuiLinkButton
                    buttonType="secondary"
                    href={addBasePath('/app/kibana#/management/kibana/index')}
                  >
                    {t('Set up index patterns')}
                  </KuiLinkButton>
                </KuiFlexItem>
              </KuiFlexGroup>

            </KuiFlexItem>
          </KuiFlexGroup>
        </div>

        <div className="kuiViewContentItem kuiVerticalRhythmXLarge">
          <KuiFlexGroup className="kuiVerticalRhythm">
            <KuiFlexItem className="kuiPanel homePanel">
              <h3 className="kuiSubTitle kuiVerticalRhythm">
                {t('Visualize and Explore Data')}
              </h3>
              <KuiFlexGrid className="kuiVerticalRhythmSmall homeTopFeatures" columns={2}>
                { renderDirectories(FeatureCatalogueCategory.DATA) }
              </KuiFlexGrid>
            </KuiFlexItem>
            <KuiFlexItem className="kuiPanel homePanel">
              <h3 className="kuiSubTitle kuiVerticalRhythm">
                {t('Manage and Administer the Elastic Stack')}
              </h3>
              <KuiFlexGrid className="kuiVerticalRhythmSmall homeTopFeatures" columns={2}>
                { renderDirectories(FeatureCatalogueCategory.ADMIN) }
              </KuiFlexGrid>
            </KuiFlexItem>
          </KuiFlexGroup>
        </div>

        <div className="kuiViewContentItem kuiVerticalRhythmXLarge text-center">
          <h4 className="kuiSubduedText kuiVerticalRhythmSmall">
            {t('Didn’t find what you were looking for?')}
          </h4>
          <KuiLinkButton
            buttonType="secondary"
            href="#/home/feature_directory"
          >
            {t('View full directory of Kibana plugins')}
          </KuiLinkButton>
        </div>

      </div>
    </div>
  );
}

Home.propTypes = {
  addBasePath: PropTypes.func.isRequired,
  directories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    showOnHomePage: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired
  })),
  t: PropTypes.func.isRequired
};
