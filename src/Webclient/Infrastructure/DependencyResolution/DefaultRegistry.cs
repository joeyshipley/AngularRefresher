// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DefaultRegistry.cs" company="Web Advanced">
// Copyright 2012 Web Advanced (www.webadvanced.com)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;
using StructureMap.Configuration.DSL;
using StructureMap.Graph;

namespace NGA.Webclient.Infrastructure.DependencyResolution {
    public class DefaultRegistry : Registry {
        #region Constructors and Destructors

        private static readonly List<string> _assembliesToScan = new List<string>
        {
            "NGA.Webclient"
        };

        public DefaultRegistry() {
            Scan(scan => 
            {
                scan.TheCallingAssembly();
                scan.WithDefaultConventions();
                _assembliesToScan.ForEach(scan.Assembly);
            });
            // For<IExample>().Use<Example>();
        }

        #endregion
    }
}